import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetTotalMembersAnalytics } from '@/dataOperations/analytics';
import Loader from '@/components/Loader';




const chartConfig = {
  level: {
    label: "Level",
    color: "#EA5353",
  },

}


const TotalMembersChart = () => {
  const { data, isLoading } = useGetTotalMembersAnalytics()
  const totalData = data?.success
    ? Object.entries(data?.data?.levelCounts).map(([level, total]) => ({
      level,
      total,
    }))
    : [];
  return (
    <div className='p-5 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-between items-center'>
        <h2 className='text-sm font-medium text-foreground/80'>Total Members</h2>
        {/* <Select>
          <SelectTrigger className="w-fit flex gap-3  h-fit">
            <SelectValue placeholder="Last 7 days" className='py-0' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Last 7 days</SelectItem>
            <SelectItem value="dark">Last 14 days</SelectItem>
            <SelectItem value="system">Last 30 days</SelectItem>
          </SelectContent>
        </Select> */}
        <h2 className='border border-primary rounded-lg px-4 py-[6px] bg-primary/20 text-primary text-xs'>{data?.data?.totalMembers} Members</h2>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-5">
        {!isLoading && (
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
        )}
        {isLoading && (
          <div className='flex justify-center items-center space-y-2 h-full w-full'>
            <Loader className={"border-primary"} />

          </div>
        )}
      </ChartContainer>
    </div>
  )
}

export default TotalMembersChart
