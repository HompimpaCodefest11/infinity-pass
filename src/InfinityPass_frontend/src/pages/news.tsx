"use client"

import { useState } from "react"
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid"
import { Tabs } from "../components/ui/tabs"
import { Search, TrendingUp, Clock, Star } from "lucide-react"

function News() {
  const categories = [
    { title: "All", value: "All" },
    { title: "Crypto", value: "Crypto" },
    { title: "Finance", value: "Finance" },
    { title: "NFT", value: "NFT" },
    { title: "Web3", value: "Web3" },
  ]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("all")

  // Filter items based on both category and search query
  const filteredItems = items.filter((item) => {
    // First filter by category
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory

    // Then filter by search query if there is one
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Get top news (items marked as featured)
  const topNews = items.filter((item) => item.featured)

  // Get most read news (items with highest readCount)
  const mostRead = [...items].sort((a, b) => (b.readCount || 0) - (a.readCount || 0)).slice(0, 3)

  // Get latest news (most recent items)
  const latestNews = [...items]
    .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white py-16 text-black flex flex-col">
      {/* Featured News Banner */}
      <div className="w-full bg-gray-50 py-10 mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Featured Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-xl overflow-hidden h-64 md:h-80">
              <Skeleton
                image={
                  topNews[0]?.header?.props?.image || "https://thenewscrypto.com/wp-content/uploads/2025/01/link.jpg"
                }
              />
            </div>
            <div className="space-y-4">
              <div className="text-sm font-medium text-indigo-600">{topNews[0]?.category || "Crypto"}</div>
              <h3 className="text-2xl md:text-3xl font-bold">
                {topNews[0]?.title || "Chainlink Eyes Breakout: Can the Demand Zone Propel LINK Beyond $20?"}
              </h3>
              <p className="text-gray-600">
                {topNews[0]?.description ||
                  "Chainlink has bounced from a 24-hour low of $13.07 to trade near $15.21, recovering from a lower price rejection."}
              </p>
              <a
                href={topNews[0]?.to || "#"}
                className="inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              >
                Read full story →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full px-4">
        {/* Section Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b pb-2">
          <button
            onClick={() => setActiveSection("all")}
            className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeSection === "all" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            All News
          </button>
          <button
            onClick={() => setActiveSection("trending")}
            className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeSection === "trending" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
            Most Read
          </button>
          <button
            onClick={() => setActiveSection("latest")}
            className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeSection === "latest" ? "bg-gray-100 text-black font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Latest
          </button>
        </div>

        {/* Header with tabs and search */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Tabs on the left */}
            <Tabs
              tabs={categories.map((category) => ({
                title: category.title,
                value: category.value,
              }))}
              containerClassName="flex"
              activeTabClassName="bg-black"
              tabClassName="text-gray-500 hover:text-gray-800"
              onChange={(value) => setSelectedCategory(value)}
            />

            {/* Search on the right */}
            <div className="relative w-full sm:w-56">
              <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-6 py-1.5 text-sm bg-transparent focus:outline-none"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content based on active section */}
        {activeSection === "all" && (
          <>
            {filteredItems.length > 0 ? (
              <BentoGrid className="max-w-6xl mx-auto">
                {filteredItems.map((item, i) => (
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
            ) : (
              <div className="max-w-4xl mx-auto text-center py-12">
                <h3 className="text-xl font-medium">No results found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or category to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}

        {activeSection === "trending" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Most Read Articles</h2>
            {mostRead.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 border-b pb-8">
                <div className="md:w-1/3 rounded-xl overflow-hidden h-48">{item.header}</div>
                <div className="md:w-2/3 space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                    <span className="mx-2">•</span>
                    <span>{item.date || "March 7, 2025"}</span>
                    <span className="mx-2">•</span>
                    <span>{item.readCount || Math.floor(Math.random() * 1000) + 500} reads</span>
                  </div>
                  <h3 className="text-xl font-bold">
                    <a href={item.to} className="hover:text-indigo-600 transition-colors">
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "latest" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestNews.map((item, i) => (
                <div key={i} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">{item.header}</div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                      <span>{item.date || "March 7, 2025"}</span>
                    </div>
                    <h3 className="text-lg font-bold">
                      <a href={item.to} className="hover:text-indigo-600 transition-colors">
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default News

const Skeleton = ({ image }: { image?: string }) => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 bg-cover bg-center"
    style={{ backgroundImage: image ? `url(${image})` : "none" }}
  />
)

// Enhanced news items with additional properties
const items = [
  {
    title: "Chainlink Eyes Breakout: Can the Demand Zone Propel LINK Beyond $20?",
    description:
      "Chainlink has bounced from a 24-hour low of $13.07 to trade near $15.21, recovering from a lower price rejection.",
    category: "Crypto",
    header: <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2025/01/link.jpg" />,
    to: "https://thenewscrypto.com/chainlink-eyes-breakout-can-the-demand-zone-propel-link-beyond-20/",
    featured: true,
    readCount: 1245,
    date: "March 7, 2025",
  },
  {
    title: "Monthly Market Insights Report by Binance Research Highlights Key Trends and Developments",
    description:
      "February 2025 was a challenging month for the crypto market, as it suffered a substantial 20.2% decline.",
    category: "Finance",
    header: <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2024/08/Binance-plans-to-have1.jpg" />,
    to: "/news/digital-revolution",
    readCount: 876,
    date: "March 5, 2025",
  },
  {
    title: "Doodles' Solana token fails to impress",
    description:
      "As most of you probably know by now, Doodles — the rainbow-barfing Ethereum NFT collection of 10,000 PFPs of the 2021 NFT boom — is launching a token on Solana. ",
    category: "NFT",
    header: (
      <Skeleton image="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2025%2F02%2Fdoodles.jpg&w=1920&q=75" />
    ),
    to: "https://blockworks.co/news/doodles-solana-token-criticisms",
    readCount: 1532,
    date: "March 6, 2025",
  },
  {
    title: "Revamping Aave's Tokenomics: A Proposal by Marc Zeller",
    description:
      "Marc Zeller, the founder of Aave Chan Initiative (ACI), introduced a proposal on March 4 to overhaul Aave's tokenomics.",
    category: "Crypto",
    header: (
      <Skeleton image="https://app.chaingpt.org/_next/image?url=https%3A%2F%2Fd2qsg582zx9qac.cloudfront.net%2Fdocument%2F7ad4d56a-dd0e-35e3-aa61-a41867a816ea.jpg&w=640&q=75" />
    ),
    to: "https://crypto.ro/en/wp-content/uploads/2025/03/photo_5924592233472968965_w-1024x682.jpg",
    featured: true,
    readCount: 943,
    date: "March 4, 2025",
  },
  {
    title: "Animoca Brands Record $314 Million Revenue by December 2024",
    description: "Animoca Brands recorded a revenue of $314 million in the last year.",
    category: "Finance",
    header: (
      <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2025/03/Animoca_Brands_co_founder_and_executive_chairman_Yat_Siu_expects.jpg" />
    ),
    to: "https://thenewscrypto.com/animoca-brands-record-314-million-revenue-by-december-2024/",
    readCount: 765,
    date: "March 3, 2025",
  },
  {
    title: "XRP Bulls Accumulate as Whales Pile In, Holding Above Key Support.",
    description: "In the past week, whale addresses have added 1.34 billion XRP worth over $3.26 billion.",
    category: "Crypto",
    header: (
      <Skeleton image="https://thenewscrypto.com/wp-content/uploads/2025/03/XRP-Price-Rallies-30-While-XRPTurbos-AI-Launchpad.jpg" />
    ),
    to: "https://thenewscrypto.com/xrp-bulls-accumulate-as-whales-pile-in-holding-above-key-support/",
    readCount: 1087,
    date: "March 7, 2025",
  },
  {
    title: "Why more Web3 gaming projects are switching to casino-style games",
    description:
      "The Drop's Kate Irwin explains why the Web3 gaming industry isn't as focused on delivering games catered to traditional gamers",
    category: "Web3",
    header: (
      <Skeleton image="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2025%2F03%2Fgaming-controller.jpg&w=1920&q=75" />
    ),
    to: "https://blockworks.co/news/web3-gaming-projects-switching-to-casino-games",
    readCount: 892,
    date: "March 2, 2025",
  },
]

