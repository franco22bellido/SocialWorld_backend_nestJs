ALTER TABLE followers
ADD CONSTRAINT
not_same_id
CHECK ("followerId" <> "idolId");


CREATE OR REPLACE FUNCTION increment_followers_count()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
      UPDATE "public".profile SET "followersCount" = "followersCount" + 1
      WHERE "userId" = NEW."idolId";
   RETURN NEW;
END;
$$;

 CREATE TRIGGER increase_followersCount
   AFTER INSERT ON "public".followers
   FOR EACH
   ROW
	execute function increment_followers_count()


CREATE OR REPLACE FUNCTION reduce_followers_count()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
      UPDATE "public".profile SET "followersCount" = "followersCount" - 1
      WHERE "userId" = old."idolId";
   RETURN NEW;
END;
$$;

 CREATE TRIGGER decrease_followersCount
   AFTER DELETE ON "public".followers
   FOR EACH
   ROW
	execute function reduce_followers_count()

	 
CREATE OR REPLACE FUNCTION increment_following_count()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
      UPDATE "public".profile SET "followingCount" = "followingCount" + 1
      WHERE "userId" = NEW."followerId";
   RETURN NEW;
END;
$$;

 CREATE TRIGGER increase_followingCount
   AFTER insert ON "public".followers
   FOR EACH
   ROW
	execute function increment_following_count()




	 

CREATE OR REPLACE FUNCTION reduce_following_count()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
      UPDATE "public".profile SET "followingCount" = "followingCount" - 1
      WHERE "userId" = OLD."followerId";
   RETURN NEW;
END;
$$;

 CREATE TRIGGER decrease_followingCount
   AFTER DELETE ON "public".followers
   FOR EACH
   ROW
	execute function reduce_following_count()