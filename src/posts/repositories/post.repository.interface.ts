export interface IPostRepository {
  findAllByFollowings(userId: number);
}
