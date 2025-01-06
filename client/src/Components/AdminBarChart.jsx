import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'

const AdminBarChart = ({ adminData }) => {
    return (
        <ResponsiveContainer >
            <BarChart width={730} height={150} data={adminData?.adminsInfo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="investment" fill="#2997FF" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default AdminBarChart