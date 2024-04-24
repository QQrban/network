UPDATE user
SET email     = coalesce(?1, email),
    password  = coalesce(?2, password),
    firstname = coalesce(?3, firstname),
    lastname  = coalesce(?4, lastname),
    nickname  = coalesce(?5, nickname),
    imageID   = IIF(?6 IS NULL, imageID, IIF(?6 IS 0, NULL, ?6)),
    about     = coalesce(?7, about),
    birthday  = coalesce(?8, birthday),
    private   = coalesce(?9, private),
    updated   = CURRENT_TIMESTAMP

WHERE userID = ?;
