async function getDecisionMakers(domain) {
  return [
    {
      name: "Rahul Sharma",
      title: "CEO",
      linkedin: "https://linkedin.com/in/rahul"
    },
    {
      name: "Priya Verma",
      title: "VP Sales",
      linkedin: "https://linkedin.com/in/priya"
    }
  ];
}

module.exports = { getDecisionMakers };