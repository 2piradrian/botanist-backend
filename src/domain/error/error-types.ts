export enum ErrorType {
	MissingFields           = "Missing fields",
	InvalidFields           = "Invalid fields",
	InternalError           = "Internal error",
	InvalidPassword         = "Invalid password",
	Unknown                 = "Unknown error",
	UsernameAlreadyExists   = "Username already exists",
	EmailAlreadyExists      = "Email already exists",
	UserNotFound            = "User not found",
	PostNotFound            = "Post not found",
	Unauthorized            = "Unauthorized",
	Disconnected            = "Disconnected",
	CantFollowYourself      = "Can't follow yourself",
	CantLikeYourOwnPost     = "Can't like your own post",
}