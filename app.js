const { getSimilarCompanies } = require("./services/ocean");
const { getDecisionMakers } = require("./services/prospeo");
const { getEmails } = require("./services/email");
const { sendEmails } = require("./services/brevo");
const readline = require("readline");

async function main() {
  const domain = process.argv[2];

  if (!domain) {
    console.log("Please provide a domain");
    return;
  }

  console.log("Input Domain:", domain);

  const companies = await getSimilarCompanies(domain);

  console.log("\nSimilar Companies:");
  console.log(companies);

  const allContacts = [];

  for (const company of companies) {
    const contacts = await getDecisionMakers(company);

    console.log(`\nDecision Makers for ${company}:`);
    console.log(contacts);

    const contactsWithEmails = await getEmails(contacts);

    console.log("\nVerified Emails:");
    console.log(contactsWithEmails);

    allContacts.push(...contactsWithEmails);
  }

  console.log("\n====================");
  console.log("SUMMARY");
  console.log("====================");
  console.log(`Companies Found: ${companies.length}`);
  console.log(`Contacts Found: ${allContacts.length}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "\nDo you want to send emails? (y/n): ",
    async (answer) => {
      if (answer.toLowerCase() === "y") {
        await sendEmails(allContacts);

        console.log("\nAll emails sent successfully.");
      } else {
        console.log("\nEmail sending cancelled.");
      }

      rl.close();
    }
  );
}

main();