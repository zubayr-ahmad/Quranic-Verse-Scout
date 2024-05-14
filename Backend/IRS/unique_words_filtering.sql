SELECT * FROM defaultdb.unique_eng_words;

use defaultdb;

ALTER TABLE unique_eng_words ADD id INT NOT NULL FIRST;

ALTER TABLE unique_eng_words
DROP PRIMARY KEY;

UPDATE unique_eng_words
SET word = LOWER(word) limit 10000;

SET @id := 0;
UPDATE unique_eng_words
SET id = (@id := @id + 1) limit 10000;