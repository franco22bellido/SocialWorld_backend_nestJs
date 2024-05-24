ALTER TABLE followers
ADD CONSTRAINT
not_same_id
CHECK ("followerId" <> "idolId");



CREATE OR REPLACE FUNCTION update_followersCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
	UPDATE profile set followersCount = followersCount + 1
	WHERE userId = NEW.idolId;
   RETURN NEW;
END;
$$;

CREATE TRIGGER increase_followersCount
  AFTER INSERT ON followers
  FOR EACH ROW
	EXECUTE FUNCTION update_followersCount();

-------------------------------------
CREATE OR REPLACE FUNCTION updateFollowingCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
        UPDATE PROFILE SET followingCount = followingCount + 1
      	WHERE userId = NEW.followerId;
   RETURN NEW;
END;
$$;

CREATE TRIGGER increase_followingCount
  AFTER INSERT ON followers
  FOR EACH
  ROW
	EXECUTE FUNCTION updateFollowingCount()

----------------------------------


CREATE OR REPLACE FUNCTION decreaseFollowers()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
        UPDATE PROFILE SET followersCount = followersCount - 1
        where userId = OLD.idolId;
   RETURN NEW;
END;
$$;

CREATE TRIGGER decrease_FollowersCount
  AFTER DELETE ON followers
    FOR EACH
    ROW
       EXECUTE FUNCTION decreaseFollowers()
---------------------------------------

CREATE OR REPLACE FUNCTION decreaseFollowing()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
      UPDATE profile SET followingCount = followingCount - 1
      WHERE userId = old.followerId;
   RETURN NEW;
END;
$$;

 CREATE TRIGGER decrease_followingCount
   AFTER DELETE ON followers
   FOR EACH
   ROW
	execute function decreaseFollowing()