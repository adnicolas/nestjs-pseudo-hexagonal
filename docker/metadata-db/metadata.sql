BEGIN;

SET CLIENT_ENCODING TO 'UTF8';

CREATE TABLE public."role" (
	id serial4 NOT NULL,
	uuid uuid NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_6a1e31461fe66beade6c73679e3" PRIMARY KEY (id, name),
	CONSTRAINT "UQ_16fc336b9576146aa1f03fdc7c5" UNIQUE (uuid)
);

CREATE TABLE public."user" (
	id serial4 NOT NULL,
	uuid uuid NOT NULL,
	"name" varchar NOT NULL,
	surname varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	"roleId" int4 NULL,
	"roleName" varchar NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
	CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE (uuid)
);

ALTER TABLE public."user" ADD CONSTRAINT "FK_55cfa3bc47475d29b12ceced777" FOREIGN KEY ("roleId","roleName") REFERENCES public."role"(id,"name");

COMMIT;