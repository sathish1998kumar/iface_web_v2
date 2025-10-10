import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import { 
  Layers, 
  Trophy,
  AlertOctagon,
  Activity,
  ChevronRight,
  LineChart as LineChartIcon
} from 'lucide-react';
import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const COLORS = {
  primary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#8B5CF6',
  dark: '#1E293B',
  lightBg: '#F8FAFC'
};

const departmentData = [
  { name: 'Development', employees: 15, projects: 8, efficiency: 82 },
  { name: 'Marketing', employees: 8, projects: 5, efficiency: 75 },
  { name: 'Sales', employees: 12, projects: 7, efficiency: 88 }
];

const performanceTrend = [
  { month: 'Jan', efficiency: 72, target: 75 },
  { month: 'Feb', efficiency: 75, target: 75 },
  { month: 'Mar', efficiency: 80, target: 75 },
  { month: 'Apr', efficiency: 82, target: 80 },
  { month: 'May', efficiency: 85, target: 80 },
  { month: 'Jun', efficiency: 88, target: 85 }
];

const SupervisorPage = () => {
  return (
    <div style={{ padding: 24, background: COLORS.lightBg }}>
      <h1 style={{ color: COLORS.dark, marginBottom: 24, fontWeight: 600 }}>Supervisor Dashboard</h1>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { icon: <Layers color={COLORS.primary} size={20} />, title: 'Departments', value: 5, color: COLORS.primary },
          { icon: <Activity color={COLORS.success} size={20} />, title: 'Active Projects', value: 23, color: COLORS.success },
          { icon: <AlertOctagon color={COLORS.warning} size={20} />, title: 'Pending Approvals', value: 7, color: COLORS.warning },
          { icon: <Trophy color={COLORS.info} size={20} />, title: 'Overall Efficiency', value: 84, suffix: '%', color: COLORS.info }
        ].map((item, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card bordered={false} style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <Statistic
                title={<span style={{ color: COLORS.dark, fontSize: 14 }}>{item.title}</span>}
                value={item.value}
                suffix={item.suffix}
                prefix={item.icon}
                valueStyle={{ color: item.color, fontSize: 28, fontWeight: 600 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartIcon size={18} style={{ marginRight: 8 }} />
                <span>Performance Trend</span>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke={COLORS.primary} 
                    fill={COLORS.primary} 
                    fillOpacity={0.2} 
                    name="Actual Efficiency"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke={COLORS.success} 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="Department Metrics"
            bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="efficiency" name="Efficiency %" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="projects" name="Projects" fill={COLORS.info} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Card 
        title="Department Overview"
        bordered={false}
        style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        extra={<ChevronRight color={COLORS.primary} />}
      >
        <Table 
          columns={[
            { title: 'Department', dataIndex: 'name', key: 'name' },
            { title: 'Employees', dataIndex: 'employees', key: 'employees' },
            { title: 'Projects', dataIndex: 'projects', key: 'projects' },
            { 
              title: 'Efficiency', 
              dataIndex: 'efficiency', 
              key: 'efficiency',
              render: (value) => (
                <Progress 
                  percent={value} 
                  size="small" 
                  strokeColor={
                    value > 85 ? COLORS.success :
                    value > 70 ? COLORS.warning : COLORS.danger
                  }
                />
              )
            }
          ]}
          dataSource={departmentData}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default SupervisorPage;