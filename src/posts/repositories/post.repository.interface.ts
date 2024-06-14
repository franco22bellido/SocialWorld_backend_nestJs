export interface IPostRepository {
  findAllByFollowings(userId: number);
  getTrendsOfToday(userId: number);
  getPostsByUserId(userId: number);
}
