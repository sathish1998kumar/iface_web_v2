import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import { 
  Clock, 
  CheckCircle, 
  FileText, 
  AlertTriangle,
  Users,
  ChevronRight,
  BarChart2,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  primary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#8B5CF6',
  dark: '#1E293B',
  lightBg: '#F8FAFC'
};

const taskData = [
  { name: 'Completed', value: 12, color: COLORS.success },
  { name: 'In Progress', value: 5, color: COLORS.warning },
  { name: 'Pending', value: 3, color: COLORS.danger }
];

const performanceData = [
  { week: 'Jan', productivity: 70 },
  { week: 'Feb', productivity: 75 },
  { week: 'Mar', productivity: 82 },
  { week: 'Apr', productivity: 78 },
  { week: 'May', productivity: 85 },
  { week: 'Jun', productivity: 88 }
];

const tasks = [
  { 
    id: 1, 
    task: 'Complete project report', 
    deadline: '2023-06-15', 
    priority: 'High', 
    status: 'In Progress',
    progress: 65
  },
  { 
    id: 2, 
    task: 'Submit timesheet', 
    deadline: '2023-06-10', 
    priority: 'Medium', 
    status: 'Pending',
    progress: 0
  },
  { 
    id: 3, 
    task: 'Team meeting prep', 
    deadline: '2023-06-12', 
    priority: 'Low', 
    status: 'Completed',
    progress: 100
  }
];

const EmployeePage = () => {
  return (
    <div style={{ padding: 24, background: COLORS.lightBg }}>
      <h1 style={{ color: COLORS.dark, marginBottom: 24, fontWeight: 600 }}>Employee Dashboard</h1>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { icon: <Clock color={COLORS.warning} size={20} />, title: 'Pending Tasks', value: 5, color: COLORS.warning },
          { icon: <CheckCircle color={COLORS.success} size={20} />, title: 'Completed', value: 12, color: COLORS.success },
          { icon: <FileText color={COLORS.info} size={20} />, title: 'Projects', value: 3, color: COLORS.info },
          { icon: <AlertTriangle color={COLORS.danger} size={20} />, title: 'Urgent', value: 1, color: COLORS.danger }
        ].map((item, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card 
              bordered={false} 
              style={{ 
                background: 'white', 
                borderRadius: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <Statistic
                title={<span style={{ color: COLORS.dark, fontSize: 14 }}>{item.title}</span>}
                value={item.value}
                prefix={item.icon}
                valueStyle={{ 
                  color: item.color,
                  fontSize: 28,
                  fontWeight: 600
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BarChart2 size={18} style={{ marginRight: 8 }} />
                <span>Task Distribution</span>
              </div>
            }
            bordered={false}
            style={{ 
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskData.map((entry, index) => (
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
        <Col xs={24} md={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp size={18} style={{ marginRight: 8 }} />
                <span>Performance Trend</span>
              </div>
            }
            bordered={false}
            style={{ 
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke={COLORS.primary} 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    name="Productivity %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tasks Table */}
      <Card 
        title="My Tasks"
        bordered={false}
        style={{ 
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
        extra={<ChevronRight color={COLORS.primary} />}
      >
        <Table 
          columns={[
            { 
              title: 'Task', 
              dataIndex: 'task', 
              key: 'task',
              render: (text) => <strong>{text}</strong>
            },
            { 
              title: 'Deadline', 
              dataIndex: 'deadline', 
              key: 'deadline',
              render: (date) => <span style={{ color: COLORS.dark }}>{date}</span>
            },
            { 
              title: 'Priority', 
              dataIndex: 'priority', 
              key: 'priority',
              render: (priority) => (
                <Tag 
                  color={
                    priority === 'High' ? COLORS.danger :
                    priority === 'Medium' ? COLORS.warning : COLORS.success
                  }
                  style={{ fontWeight: 500 }}
                >
                  {priority}
                </Tag>
              )
            },
            { 
              title: 'Status', 
              dataIndex: 'status', 
              key: 'status',
              render: (status) => (
                <Tag 
                  color={
                    status === 'Completed' ? COLORS.success :
                    status === 'In Progress' ? COLORS.warning : COLORS.danger
                  }
                  style={{ fontWeight: 500 }}
                >
                  {status}
                </Tag>
              )
            },
            { 
              title: 'Progress', 
              dataIndex: 'progress', 
              key: 'progress',
              render: (progress) => (
                <Progress 
                  percent={progress} 
                  size="small" 
                  strokeColor={
                    progress > 70 ? COLORS.success :
                    progress > 40 ? COLORS.warning : COLORS.danger
                  }
                  showInfo={false}
                />
              )
            }
          ]}
          dataSource={tasks}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default EmployeePage;