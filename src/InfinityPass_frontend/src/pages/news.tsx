import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";

function News() {
  return (
    <div className="min-h-screen bg-white py-28 text-black flex flex-col">
      <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            to={item.to}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

export default News;

const Skeleton = ({ image }: { image?: string }) => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 bg-cover bg-center"
    style={{ backgroundImage: image ? `url(${image})` : "none" }}
  />
);

const items = [
  {
    title: "Chainlink Eyes Breakout: Can the Demand Zone Propel LINK Beyond $20?",
    description: "Chainlink has bounced from a 24-hour low of $13.07 to trade near $15.21, recovering from a lower price rejection.",
    header: <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2025/01/link.jpg" />,
    to: "https://thenewscrypto.com/chainlink-eyes-breakout-can-the-demand-zone-propel-link-beyond-20/",
},
{
    title: "Monthly Market Insights Report by Binance Research Highlights Key Trends and Developments",
    description: "February 2025 was a challenging month for the crypto market, as it suffered a substantial 20.2% decline.",
    header: <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2024/08/Binance-plans-to-have1.jpg" />,
    to: "/news/digital-revolution",
},
{
    title: "Doodles’ Solana token fails to impress",
    description: "As most of you probably know by now, Doodles — the rainbow-barfing Ethereum NFT collection of 10,000 PFPs of the 2021 NFT boom — is launching a token on Solana. ",
    header: <Skeleton image="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2025%2F02%2Fdoodles.jpg&w=1920&q=75" />,
    to: "https://blockworks.co/news/doodles-solana-token-criticisms",
},
{
    title: "Revamping Aave's Tokenomics: A Proposal by Marc Zeller",
    description: "Marc Zeller, the founder of Aave Chan Initiative (ACI), introduced a proposal on March 4 to overhaul Aave's tokenomics.",
    header: <Skeleton image="https://app.chaingpt.org/_next/image?url=https%3A%2F%2Fd2qsg582zx9qac.cloudfront.net%2Fdocument%2F7ad4d56a-dd0e-35e3-aa61-a41867a816ea.jpg&w=640&q=75" />,
    to: "https://crypto.ro/en/wp-content/uploads/2025/03/photo_5924592233472968965_w-1024x682.jpg",
},
{
    title: "Animoca Brands Record $314 Million Revenue by December 2024",
    description: "Animoca Brands recorded a revenue of $314 million in the last year.",
    header: <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2025/03/Animoca_Brands_co_founder_and_executive_chairman_Yat_Siu_expects.jpg" />,
    to: "https://thenewscrypto.com/animoca-brands-record-314-million-revenue-by-december-2024/",
},
{
    title: "XRP Bulls Accumulate as Whales Pile In, Holding Above Key Support.",
    description: "In the past week, whale addresses have added 1.34 billion XRP worth over $3.26 billion.",
    header: <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2025/03/XRP-Price-Rallies-30-While-XRPTurbos-AI-Launchpad.jpg" />,
    to: "https://thenewscrypto.com/xrp-bulls-accumulate-as-whales-pile-in-holding-above-key-support/",
},
{
    title: "Why more Web3 gaming projects are switching to casino-style games",
    description: "The Drop’s Kate Irwin explains why the Web3 gaming industry isn’t as focused on delivering games catered to traditional gamers",
    header: <Skeleton image="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2025%2F03%2Fgaming-controller.jpg&w=1920&q=75" />,
    to: "https://blockworks.co/news/web3-gaming-projects-switching-to-casino-games",
  },
];
