DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
	id character varying,
	title character varying,
	description character varying,
	img character varying
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
	id character varying,
	title character varying,
	content character varying
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	username character varying,
	password character varying
);


# INSERT INTO posts (id, title, content) VALUES ('Placeholder Title', 'placeholder', 'placeholder');

# INSERT INTO projects (id, title, description, img) VALUES ('counter', 'placeholder', 'placeholder', 'placeholderimage');
