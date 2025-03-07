"use client"

import { useState } from "react"
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid"
import { Tabs } from "../components/ui/tabs"
import { Search } from "lucide-react"

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

  const [visibleItems, setVisibleItems] = useState(6)
  const itemsPerPage = 3

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory

    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const featuredNews = items.filter((item) => item.featured)

  const mostRead = [...items].sort((a, b) => (b.readCount || 0) - (a.readCount || 0))

  const latestNews = [...items].sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())

  const loadMore = () => {
    setVisibleItems((prev) => prev + itemsPerPage)
  }

  const getCurrentItems = () => {
    switch (activeSection) {
      case "trending":
        return mostRead.slice(0, visibleItems)
      case "latest":
        return latestNews.slice(0, visibleItems)
      default:
        return filteredItems.slice(0, visibleItems)
    }
  }

  const hasMoreItems = () => {
    switch (activeSection) {
      case "trending":
        return visibleItems < mostRead.length
      case "latest":
        return visibleItems < latestNews.length
      default:
        return visibleItems < filteredItems.length
    }
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setVisibleItems(6)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setVisibleItems(6)
  }

  return (
    <div className="min-h-screen bg-white py-16 text-black flex flex-col pt-28">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => handleSectionChange("all")}
              className={`px-3 py-1.5 text-sm ${activeSection === "all" ? "text-black font-medium" : "text-gray-500"}`}
            >
              All News
            </button>
            <button
              onClick={() => handleSectionChange("trending")}
              className={`px-3 py-1.5 text-sm ${
                activeSection === "trending" ? "text-black font-medium" : "text-gray-500"
              }`}
            >
              Most Read
            </button>
            <button
              onClick={() => handleSectionChange("latest")}
              className={`px-3 py-1.5 text-sm ${
                activeSection === "latest" ? "text-black font-medium" : "text-gray-500"
              }`}
            >
              Latest
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Tabs
              tabs={categories.map((category) => ({
                title: category.title,
                value: category.value,
              }))}
              containerClassName="flex"
              activeTabClassName="bg-black"
              tabClassName="text-gray-500 hover:text-gray-800"
              onChange={(value) => handleCategoryChange(value)}
            />

            <div className="relative w-56">
              <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-6 py-1.5 text-sm bg-transparent focus:outline-none"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setVisibleItems(6)
                }}
              />
            </div>
          </div>
        </div>

        {activeSection === "all" && featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-medium mb-4">Featured</h2>
            <BentoGrid className="grid-cols-1 md:grid-cols-2">
              {featuredNews.slice(0, 2).map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className="md:col-span-1"
                  to={item.to}
                />
              ))}
            </BentoGrid>
          </div>
        )}

        {activeSection === "all" && (
          <>
            <h2 className="text-lg font-medium mb-4">All News</h2>
            {filteredItems.length > 0 ? (
              <>
                <BentoGrid>
                  {getCurrentItems().map((item, i) => (
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

                {hasMoreItems() && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No results found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or category to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}

        {activeSection === "trending" && (
          <>
            <h2 className="text-lg font-medium mb-4">Most Read</h2>
            <BentoGrid>
              {getCurrentItems().map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={i === 0 ? "md:col-span-2" : ""}
                  to={item.to}
                  meta={`${item.readCount || Math.floor(Math.random() * 1000) + 500} reads`}
                />
              ))}
            </BentoGrid>

            {hasMoreItems() && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {activeSection === "latest" && (
          <>
            <h2 className="text-lg font-medium mb-4">Latest Updates</h2>
            <BentoGrid>
              {getCurrentItems().map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={i === 0 ? "md:col-span-2" : ""}
                  to={item.to}
                  meta={item.date || "March 7, 2025"}
                />
              ))}
            </BentoGrid>

            {hasMoreItems() && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
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
      <Skeleton image="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2024%2F12%2Faave-ghost.jpg&w=768&q=40" />
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

