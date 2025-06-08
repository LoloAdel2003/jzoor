import React from 'react'
import OverviewCard from './components/OverviewCard'
import OrderTable from './components/OrderTable'

const AdminOrder = () => {
  return (
     <div className="p-6 space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <OverviewCard title="Total Order" value="1,240" percentage="14.4%" name="" prev="1000" />
          <OverviewCard title="New Orders" value="240" percentage="20%" name="" prev="150" />
          <OverviewCard title="Completed Order " value="960" percentage="85%" name="" prev="1000" />
          <OverviewCard title=" Canceled Order" value="87" percentage="5%" name="" prev="50" />
    
        </div>
        <OrderTable />
     
    </div>
  )
}

export default AdminOrder
