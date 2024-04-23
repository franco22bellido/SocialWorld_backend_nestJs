USE SOCIAL_WORLD;

DELIMITER $$
CREATE TRIGGER increase_commentsCount
 AFTER INSERT ON comments
 FOR EACH
 ROW
   BEGIN
    UPDATE post SET commentsCount = commentsCount + 1
    where id = NEW.postId;
   END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER decrease_commentsCount
 AFTER DELETE ON comments
 FOR EACH
 ROW
   BEGIN
    UPDATE post SET commentsCount = commentsCount - 1
    where id = OLD.postId;
   END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER increase_likesCount
 AFTER INSERT ON likes
 FOR EACH
 ROW
   BEGIN
    UPDATE post SET likesCount = likesCount + 1
    where id = NEW.postId;
   END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER decrease_likesCount
 AFTER DELETE ON likes
 FOR EACH
 ROW
   BEGIN
    UPDATE post SET likesCount = likesCount - 1
    where id = OLD.postId;
   END$$
DELIMITER ;