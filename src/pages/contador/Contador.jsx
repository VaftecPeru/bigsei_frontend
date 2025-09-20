import  IncomeExpenseReport  from '@/components/dashboard/IncomeExpenseReport'
import IncomeExpenseTable from '@/components/tables/IncomeExpenseTable'
import React from 'react'

function Contador() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
        <div className="w-full max-w-7xl p-2">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-4 rounded-2xl">
                {/* <AreaChartInteractive /> */}
                <IncomeExpenseReport />
            </div>
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-4 rounded-2xl">
                <IncomeExpenseTable/>

            </div>
        </div>
        
    </div>
  )
}

export default Contador