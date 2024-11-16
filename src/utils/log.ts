export function logError(...errors: unknown[]) {
  if (import.meta.env.MODE !== "production")
    console.error("DEBUG-ERROR:\n", ...errors);
}

export function logInfo(...info: unknown[]) {
  if (import.meta.env.MODE !== "production")
    console.info("DEBUG-INFO:\n", ...info);
}

export function logWarn(...warnings: unknown[]) {
  if (import.meta.env.MODE !== "production") {
    console.warn("DEBUG-WARN:\n", ...warnings);
  }
}

/*
Instead of using console.log everywhere during dev, using this function makes it easier to debug, 
as in prod, we can simply remove the log in one place.
we can also connect a log system here later, easy to manage!

logInfo("Debugging", 123, { name: "Alice" });
info = ["Debugging", 123, { name: "Alice" }]
*/
