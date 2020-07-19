Select * from information_schema.tables;

SELECT co.conname, co.contype, co.conrelid, co.confrelid, cl.relname
FROM pg_catalog.pg_constraint co
LEFT OUTER JOIN pg_catalog.pg_class cl
ON co.conrelid = cl.oid;
