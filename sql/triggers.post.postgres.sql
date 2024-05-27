CREATE OR REPLACE FUNCTION increment_comments_count()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
  	UPDATE public."post" SET "commentsCount" = "commentsCount" + 1
    where id = NEW."postId";
   RETURN NEW;
END;
$$;


CREATE TRIGGER increase_commentsCount
 AFTER INSERT ON public."comments"
 FOR EACH
 ROW   
	EXECUTE FUNCTION increment_comments_count();

-------------------------------------------------------

CREATE OR REPLACE FUNCTION reduce_comments_count()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
     UPDATE "public".post SET "commentsCount" = "commentsCount" - 1
   	 where id = OLD."postId";
   RETURN NEW;
END;
$$;


CREATE TRIGGER decrease_commentsCount
 AFTER DELETE ON "public".comments
 FOR EACH
 ROW
   EXECUTE FUNCTION reduce_comments_count();

-----------------------------------------------
CREATE OR REPLACE FUNCTION increment_likesCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
  	UPDATE public."post" SET "likesCount" = "likesCount" + 1
    where id = NEW."postId";
   RETURN NEW;
END;
$$;

CREATE TRIGGER increase_likesCount
 AFTER INSERT ON likes
 FOR EACH
 ROW
	EXECUTE FUNCTION increment_likesCount();

-----------------------------------------------

CREATE OR REPLACE FUNCTION reduce_likesCount()
   RETURNS TRIGGER
   LANGUAGE PLPGSQL
AS
$$
BEGIN
  	UPDATE public."post" SET "likesCount" = "likesCount" - 1
    where id = OLD."postId";
   RETURN NEW;
END;
$$;


CREATE TRIGGER decrease_likesCount
 AFTER DELETE ON "public".likes
 FOR EACH
 ROW
	EXECUTE FUNCTION reduce_likesCount()