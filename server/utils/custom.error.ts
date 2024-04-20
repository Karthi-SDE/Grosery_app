
export const ErrorHandler = (error: any) => {
  console.log("error in custom handler is", error.code);
  let errRes = error;
  if (error) {
    if (error.code && error.code.startsWith("P")) {
      errRes = error.message;
    } else if (error.isJoi) {
      errRes = error.details
        .map((d: any) => d.message)
        .join(", ")
        .replace(/"/g, "");
    } else if (error instanceof Error && typeof error === "object") {
      try {
        errRes = error.message;
      } catch (e) {
        errRes = undefined;
      }
    } else if (typeof error === "string" || error instanceof String) {
      errRes = error;
    }
  }
  console.log("objectError", errRes);
  return errRes;
};