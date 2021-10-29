const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../connection');

class PullRequest extends Model {
  static async insertOrUpdate(compositeKey, opts) {
    const result = await PullRequest.findOne({
      where: compositeKey,
    });

    if (result) {
      return {
        pullRequestEntry: await PullRequest.updateByCompositeKey(
          compositeKey,
          opts,
        ),

        isNewEntry: false,
      };
    }

    const { dataValues: pullRequestEntry } = await PullRequest.create(
      {
        ...opts,
        ...compositeKey,
      },
      { raw: true },
    );

    return {
      pullRequestEntry,
      isNewEntry: true,
    };
  }

  static async updateByCompositeKey(compositeKey, opts) {
    const result = await PullRequest.update(opts, {
      where: compositeKey,
      returning: true,
      raw: true,
    });

    return result[1][0];
  }

  static async getPRsAssociatedWithUser(email, githubID) {
    const PRsAssociatedWithEmail = await PullRequest.findAll({
      where: {
        emails: {
          [Op.contains]: [email],
        },
      },
      raw: true,
    });

    const PRsAssociatedWithGithubAccount = await PullRequest.findAll({
      where: {
        github_ids: {
          [Op.contains]: [githubID],
        },
      },
      raw: true,
    });

    return PRsAssociatedWithEmail.concat(PRsAssociatedWithGithubAccount);
  }
}

PullRequest.init(
  {
    number: {
      type: DataTypes.INTEGER,
      unique: false,
      primaryKey: true,
    },
    repo_owner: {
      type: DataTypes.STRING,
      unique: false,
      primaryKey: true,
    },
    repo_name: {
      type: DataTypes.STRING,
      unique: false,
      primaryKey: true,
    },
    comment_id: DataTypes.INTEGER,
    commit_sha: DataTypes.STRING,
    github_ids: DataTypes.ARRAY(DataTypes.INTEGER),
    github_names: DataTypes.ARRAY(DataTypes.STRING),
    emails: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    sequelize,
    tableName: 'pull_request',
    underscored: true,
  },
);

module.exports = PullRequest;
