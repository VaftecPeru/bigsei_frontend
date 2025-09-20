import React from "react"
import { Box, Tab, Tabs } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const StepTabs = ({ value, onChange, onBack }) => {
    return (
        <div className="flex items-center gap-4 mb-6">
            {onBack && (
                <Button 
                    onClick={onBack} 
                    className="p-3 rounded-full bg-gray-200 text-gray-500 hover:text-white">
                    <ArrowLeft className="w-3 h-3" />
                </Button>
            )}
            <Box sx={{ width: "100%" }}>
                <Tabs
                    value={value}
                    onChange={onChange}
                    aria-label="Step Tabs"
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Documentación" disabled={value !== 0} />
                    <Tab label="Matrícula" disabled={value !== 1} />
                    <Tab label="Pago" disabled={value !== 2} />
                    <Tab label="Reporte" disabled={value !== 3} />
                </Tabs>
            </Box>
        </div>
    )
}

export default StepTabs
