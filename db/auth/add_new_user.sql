insert into puppygram_user(username, hash, is_admin)
value ($1, $2, $3)
returning *;