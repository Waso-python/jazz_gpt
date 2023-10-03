import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import {Grid,Typography,IconButton} from "@mui/material"

import {ResponsiveContainer} from "recharts";

interface IAreaChartWrapperProps {
    height: number
    chartTopic?: string |React.ReactNode
    handleZoomOut?: () => void
    children: any
}

// Принимает: height - высота графика, children - график, handleZoomOut - обработчик выхода из зума
// chartTopic - название графика
const AreaChartWrapper = ({height, chartTopic, handleZoomOut, children}: IAreaChartWrapperProps) => {
    return (
        <>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    {
                        chartTopic &&
                        typeof chartTopic === 'string'
                            ? <Typography fontWeight={500}>{chartTopic}</Typography>
                            : chartTopic
                    }
                </Grid>
                <Grid item>
                    {
                        handleZoomOut &&
                        <IconButton onClick={handleZoomOut}>
                            <ZoomOutIcon/>
                        </IconButton>
                    }
                </Grid>
            </Grid>
            <ResponsiveContainer width='100%' height={height}>
                {children}
            </ResponsiveContainer>
        </>
    )
}

export default AreaChartWrapper