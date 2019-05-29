const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const exec = require("execute-command-sync");
const DIR = `${__dirname}/..`;

exec("git add .", {cwd:DIR});
exec("git status", {cwd:DIR});
readline.question("Insert commit message (empty is aborted): ", answer => {
	readline.close();
	if(answer) {
		exec(`git commit -m ${JSON.stringify(answer)}`, {cwd:DIR});
		try {
			exec("git push", {cwd:DIR});
			console.log("\n");
			exec("git status");
			console.log("[#] Changes commited and pushed successfully");
			console.log("\n\n\n\n\n");
		} catch(error) {
			console.log("[!] Error pushing changes.");
			exec("git status");
		}
	} else {
		console.log("[!] Aborted commit & push");
	}
});