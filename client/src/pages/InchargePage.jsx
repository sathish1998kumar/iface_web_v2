import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import { 
  Users, 
  ClipboardList, 
  AlertCircle,
  BarChart2,
  ChevronRight,
  Award,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell,
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

const teamData = [
  { name: 'John Doe', tasks: 8, completed: 6, efficiency: 85 },
  { name: 'Jane Smith', tasks: 5, completed: 4, efficiency: 75 },
  { name: 'Mike Johnson', tasks: 7, completed: 5, efficiency: 72 }
];

const taskDistribution = [
  { name: 'Completed', value: 15, color: COLORS.success },
  { name: 'In Progress', value: 8, color: COLORS.warning },
  { name: 'Pending', value: 4, color: COLORS.danger }
];

const InchargePage = () => {
  return (
    <div style={{ padding: 24, background: COLORS.lightBg }}>
      <h1 style={{ color: COLORS.dark, marginBottom: 24, fontWeight: 600 }}>InCharge  Dashboard</h1>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { icon: <Users color={COLORS.primary} size={20} />, title: 'Team Members', value: 8, color: COLORS.primary },
          { icon: <ClipboardList color={COLORS.success} size={20} />, title: 'Completed Tasks', value: 15, color: COLORS.success },
          { icon: <AlertCircle color={COLORS.warning} size={20} />, title: 'Pending Approvals', value: 3, color: COLORS.warning },
          { icon: <Award color={COLORS.info} size={20} />, title: 'Team Efficiency', value: 78, suffix: '%', color: COLORS.info }
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
        <Col xs={24} md={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BarChart2 size={18} style={{ marginRight: 8 }} />
                <span>Team Performance</span>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" name="Efficiency %" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PieChartIcon size={18} style={{ marginRight: 8 }} />
                <span>Task Distribution</span>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {taskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Card 
        title="Team Overview"
        bordered={false}
        style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        extra={<ChevronRight color={COLORS.primary} />}
      >
        <Table 
          columns={[
            { title: 'Member', dataIndex: 'name', key: 'name' },
            { title: 'Tasks', dataIndex: 'tasks', key: 'tasks' },
            { title: 'Completed', dataIndex: 'completed', key: 'completed' },
            { 
              title: 'Efficiency', 
              dataIndex: 'efficiency', 
              key: 'efficiency',
              render: (value) => (
                <Progress 
                  percent={value} 
                  size="small" 
                  strokeColor={
                    value > 80 ? COLORS.success :
                    value > 60 ? COLORS.warning : COLORS.danger
                  }
                />
              )
            }
          ]}
          dataSource={teamData}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default InchargePage;