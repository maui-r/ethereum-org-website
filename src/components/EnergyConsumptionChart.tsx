import React, { useMemo } from "react"
import { Box, Center } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Text,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Legend,
} from "recharts"
import Translation from "./Translation"
import { useWindowSize } from "../hooks/useWindowSize"

interface ITickProps {
  x: number
  y: number
  payload: { value: number | string }
}

const CustomTick: React.FC<ITickProps> = ({ x, y, payload }) => {
  const theme = useTheme()

  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        x={0}
        y={0}
        dy={15}
        width={50}
        fill={theme.colors.text}
        textAnchor="middle"
        verticalAnchor="middle"
        fontSize="10px"
      >
        {payload.value}
      </Text>
    </g>
  )
}

const EnergyConsumptionChart: React.FC = () => {
  const theme = useTheme()
  const [width] = useWindowSize()

  const smallBreakpoint = Number(theme.breakpoints.s.replace("px", ""))
  const mediumBreakpoint = Number(theme.breakpoints.m.replace("px", ""))

  type Data = Array<{
    name: string
    amount: number
    color: string
    breakpoint?: number
  }>

  // TODO: Extract translatable strings
  const energyConsumptionChartData: Data = [
    {
      name: "YouTube",
      amount: 244,
      color: "#FF0000",
    },
    {
      name: "Gold mining",
      amount: 240,
      color: "#D7B14A",
      breakpoint: mediumBreakpoint,
    },
    {
      name: "BTC PoW",
      amount: 200,
      color: "#F2A900",
    },
    {
      name: "ETH PoW",
      amount: 112,
      color: "#C1B6F5",
    },
    {
      name: "Netflix",
      amount: 94,
      color: "#E50914",
      breakpoint: smallBreakpoint,
    },
    {
      name: "Gaming",
      amount: 34,
      color: "#71BB8A",
      breakpoint: mediumBreakpoint,
    },
    {
      name: "PayPal",
      amount: 0.26,
      color: "#C1B6F5",
      breakpoint: smallBreakpoint,
    },
    {
      name: "ETH PoS",
      amount: 0.01,
      color: "#C1B6F5",
    },
  ]

  const filteredData = useMemo(
    () =>
      energyConsumptionChartData.filter(
        (cell) => !cell.breakpoint || cell.breakpoint < width
      ),
    [energyConsumptionChartData, width]
  )

  return (
    <Center w="full">
      <Box maxW="500px" w="full">
        <ResponsiveContainer height={500}>
          <BarChart
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            barGap={15}
            barSize={38}
            // data={energyConsumptionChartData}
            data={filteredData}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="5 3"
              stroke="#B9B9B9"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              // @ts-ignore
              tick={<CustomTick />}
              interval={0}
            />
            <Legend
              content={
                <Box textAlign="center" color="text" fontWeight="600" mt={8}>
                  <Translation id="page-what-is-ethereum-energy-consumption-chart-legend" />
                </Box>
              }
            />
            <Bar
              dataKey="amount"
              radius={[4, 4, 0, 0]}
              // Disable animation ~ issue w/ LabelList. Ref: https://github.com/recharts/recharts/issues/1135
              isAnimationActive={false}
            >
              <LabelList
                position="top"
                fill={theme.colors.text}
                fontSize={14}
                offset={10}
              />
              {filteredData.map((cell, index) => (
                <Cell key={`cell-${index}`} fill={cell.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Center>
  )
}

export default EnergyConsumptionChart
