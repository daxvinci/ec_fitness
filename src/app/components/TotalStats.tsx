

const TotalStats = () => {

    const memberStats = [
        { title: "Total Members", value: 0, valueClass:"text-gray-700" },
        {
          title: "Active Members",
          value: 0,
          tag: <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Active</span>,
          valueClass: "text-green-600",
        },
        {
          title: "Expiring Soon",
          value: 0,
          tag: <span className="text-yellow-500 text-lg">⚠️</span>,
          valueClass: "text-yellow-600",
        },
        {
          title: "Expired",
          value: 0,
          tag: <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">Expired</span>,
          valueClass: "text-red-600",
        },
      ]

    return ( 
        <>
             <div className="grid grid-cols-1 my-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
              {memberStats.map((card, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border">
                    <p className="font-medium text-gray-700 flex gap-2 items-center justify-between">
                        {card.title}
                        {card.tag}
                    </p>
                    <div className={`text-2xl font-bold mt-1 ${card.valueClass || ""}`}>{card.value}</div>
                </div>
          ))}
        </div>
        </>
     );
}
 
export default TotalStats;