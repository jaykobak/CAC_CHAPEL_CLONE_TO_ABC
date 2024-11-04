import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




const totalData = [
  { level: "100 Level", total: 5000 },
  { level: "200 Level", total: 500 },
  { level: "300 Level", total: 4500 },
  { level: "400 Level", total: 7000 },
  { level: "500 Level", total: 3000 },
  { level: "Children", total: 5000 },
  { level: "Parents", total: 1000 },
]

const chartConfig = {
  level: {
    label: "Level",
    color: "#EA5353",
  },
}


const TotalMembersChart = () => {
  return (
    <div className='p-5 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-between items-center'>
        <h2 className='text-sm font-medium text-foreground/80 mb-4'>Total Members</h2>
        <Select>
          <SelectTrigger className="w-fit flex gap-3  h-fit">
            <SelectValue placeholder="Last 7 days" className='py-0' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Last 7 days</SelectItem>
            <SelectItem value="dark">Last 14 days</SelectItem>
            <SelectItem value="system">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-5">
        <BarChart accessibilityLayer data={totalData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="level"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="total"
            tickLine={false}
            tickMargin={10}
            axisLine={false}

          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-level)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default TotalMembersChart
