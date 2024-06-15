export interface IPostRepository {
  findAllByFollowings(userId: number, lastPostId: number);
  getTrendsOfToday(userId: number);
  getPostsByUserId(userId: number);
}
