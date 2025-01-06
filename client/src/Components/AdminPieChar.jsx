import React from 'react'
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const AdminPieChar = ({ adminData }) => {
    return (
        <ResponsiveContainer>
            <PieChart width={730} height={300}>
                <Legend color='#82ca9d' />
                <Tooltip />
                <Pie data={adminData?.adminsInfo} dataKey="investment" nameKey="username" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#2997FF" label />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default AdminPieChar