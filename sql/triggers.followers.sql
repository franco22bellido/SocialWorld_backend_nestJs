use social_world;

ALTER TABLE followers 
add constraint 
CHECK (followerId <> idolId);

DELIMITER $$
CREATE TRIGGER increase_followersCount
  AFTER INSERT ON followers
  FOR EACH ROW
  BEGIN
	UPDATE profile set followersCount = followersCount + 1
	WHERE userId = NEW.idolId;
  END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER increase_followingCount
  AFTER INSERT ON followers
  FOR EACH
  ROW
    BEGIN
      UPDATE PROFILE SET followingCount = followingCount + 1
      WHERE userId = NEW.followerId;
	END$$
DELIMITER ;



DELIMITER $$
CREATE TRIGGER decrease_FollowersCount
  AFTER DELETE ON followers
    FOR EACH
    ROW
      BEGIN
        UPDATE PROFILE SET followersCount = followersCount - 1
        where userId = OLD.idolId;
      END$$
DELIMITER ;

DELIMITER $$
 CREATE TRIGGER decrease_followingCount
   AFTER DELETE ON followers
   FOR EACH
   ROW
     BEGIN
      UPDATE profile SET followingCount = followingCount - 1
      WHERE userId = old.followerId;
     END$$
DELIMITER ;
