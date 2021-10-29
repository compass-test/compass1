#!/bin/bash
# lists old branches and tags on the remote with optional removal

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

function print_usage() {
  echo "lists old branches and tags. Use -t to remove local tags not in the remote, and -d to delete old branches and tags in the remote."
}

#######################################
# Reads old-branches.txt and attempts to remove list branches
# Arguments:
#   $1: number of retries in case of failed deletion
# Outputs:
#   None
#######################################
function delete_branches() {
  RETRY=$1

  if (( $RETRY<=0 )); then
    echo 0
  else
    set +e
    cut -d ' ' -f 9 old-branches.txt | xargs -n 5 git push --delete origin
    if [[ $? = 0 ]]; then
      echo 0
    else
      echo "deletion had errors, retrying..."
      delete_branches $RETRY-1
    fi
    set -e
  fi
}

d_flag=''
t_flag=''
while getopts 'dt' flag; do
  case "${flag}" in
    d) d_flag='true' ;;
    t) t_flag='true' ;;
    *) print_usage
       exit 1 ;;
  esac
done

# threshold dates for deletion are currently not cross-platform (macOS only)
# branches are old if their most recent commit is from before this date
BRANCH_THRESHOLD=$(date -v -3m +%s)
# tags are old if they were created before this date
TAG_THRESHOLD=$(date -v -6m +%s)
# number of delete retries
RETRIES=3

echo -n "" > old-branches.txt
echo -n "" > old-tags.txt

git fetch --all && git fetch --tags

# git does not prune tags - manually deleting all local tags then recreating ones that exist in the remote will prevent 'remote ref does not exist' errors
if [[ -n $t_flag ]]; then
  git tag -l | xargs git tag -d
  git fetch --tags
fi

# example line of output: 1509583652 Thu Nov 2 11:47:32 2017 +1100 a7f0460a05a394b134308f6c6177fa3e964c1380 bar
ALL_TAGS=$(git for-each-ref --sort=creatordate --format '%(creatordate:unix) %(creatordate) %(objectname) %(refname:lstrip=2)' refs/tags | grep -v -E " (next-release-start-|release/)[A-Za-z]+$")
# setting and unsetting x prevents the output being clogged by a log from each iteration of the loop
set +x
echo "$ALL_TAGS" | while read tag_line ; do
  # the tag lines start with and are sorted by the unix epoch time we can do a direct comparison
  if [[ "$tag_line" < "$TAG_THRESHOLD" ]] ; then
    echo "$tag_line" >> old-tags.txt
  fi
done
echo "Old tags listed in old-tags.txt"
echo "Total tags: $(echo "$ALL_TAGS" | wc -l)"
echo "Old tags: $(cat old-tags.txt | wc -l)"
set -x

ALL_BRANCHES=$(git for-each-ref --sort=committerdate --format '%(committerdate:unix) %(committerdate) %(objectname) %(refname:lstrip=3)' refs/remotes/origin | grep -v -E " (HEAD|master|develop)$" | grep -v -E ".*DO-NOT-DELETE/.*")
set +x
echo "$ALL_BRANCHES" | while read branch_line ; do
  if [[ "$branch_line" < "$BRANCH_THRESHOLD" ]]; then
    echo "$branch_line" >> old-branches.txt
  fi
done
echo "Old branches listed in old-branches.txt"
echo "Total branches: $(echo "$ALL_BRANCHES" | wc -l)"
echo "Old branches: $(cat old-branches.txt | wc -l)"
set -x

if [[ -n $d_flag ]]; then
  echo "Deleting branches listed in old-branches.txt..."
  delete_branches $RETRIES

  echo "Deleting tags listed in old-tags.txt"
  cut -d ' ' -f 9 old-tags.txt | xargs -n 50 git push --delete origin
fi

