export interface IUserRepository {
  findByUsername(username: string);
  findByUsernameWithProfileAndPosts(username: string);
  findByUsernameAndSelectPassword(username: string);
  findByEmail(email: string);
  findOneByUsernameOrSimilar(partialUsername: string);
}
