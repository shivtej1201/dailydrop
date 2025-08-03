// import jwt from "jsonwebtoken"

// const auth = async (request, response) => {
//   try {
//     const token =
//       request.cookie.accessToken ||
//       request?.header?.authorization.split(" ")[1]; // bearer token
// if(!token){
//     return response.status(401).json({
//         message:"Provide Token"
//     })
// }

// const decode = await jwt.verify(token,process.env.SECREAT_KEY_ACCESS_TOKEN)
// console.log("decode", decode)

//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    // Correctly access cookies
    const tokenFromCookie = request.cookies?.accessToken;

    // Correctly access authorization header
    const tokenFromHeader = request.headers?.authorization?.split(" ")[1];

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return response.status(401).json({
        message: "Provide Token",
        error: true,
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECREAT_KEY_ACCESS_TOKEN);
    if (!decode) {
      return response.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;

    next(); // ✅ Move to next middleware/route
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
