export const Route = {
  route: '',
  setRoute(newRoute: string) {
    this.route = newRoute;
  },
  getRoute(): string {
    return this.route;
  },
};
