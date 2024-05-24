CREATE OR REPLACE FUNCTION trigger_function()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
  	UPDATE public."post" SET commentsCount = commentsCount + 1
    where id = NEW.postId;
   RETURN NEW;
END;
$$;


CREATE TRIGGER increase_commentsCount
 AFTER INSERT ON public."comments"
 FOR EACH
 ROW   
	EXECUTE FUNCTION trigger_function();

-------------------------------------------------------

CREATE OR REPLACE FUNCTION update_post_commentsCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
     UPDATE post SET commentsCount = commentsCount - 1
   	 where id = OLD.postId;
   RETURN NEW;
END;
$$;


CREATE TRIGGER decrease_commentsCount
 AFTER DELETE ON comments
 FOR EACH
 ROW
   EXECUTE FUNCTION update_post_commentsCount();

-----------------------------------------------
CREATE OR REPLACE FUNCTION update_likesCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
  	UPDATE post SET likesCount = likesCount + 1
    where id = NEW.postId;
   RETURN NEW;
END;
$$;

CREATE TRIGGER increase_likesCount
 AFTER INSERT ON likes
 FOR EACH
 ROW
	EXECUTE FUNCTION update_likesCount()

-----------------------------------------------

CREATE OR REPLACE FUNCTION update_likesCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
  	UPDATE post SET likesCount = likesCount - 1
    where id = OLD.postId;
   RETURN NEW;
END;
$$;


CREATE TRIGGER decrease_likesCount
 AFTER DELETE ON likes
 FOR EACH
 ROW
	EXECUTE FUNCTION update_likesCount()