import React from "react";
import { Card, Row, Col, Statistic, Table, Tag, Progress } from "antd";
import {
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PolarAngleAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  primary: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#8B5CF6",
  dark: "#1E293B",
  lightBg: "#F8FAFC",
};

const delegatedTasks = [
  {
    id: 1,
    task: "Client Meeting",
    original: "John Doe",
    deadline: "2023-06-12",
    priority: "High",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 2,
    task: "Report Review",
    original: "Jane Smith",
    deadline: "2023-06-15",
    priority: "Medium",
    status: "Pending",
    progress: 0,
  },
];

const taskDistribution = [
  { name: "Completed", value: 35, color: COLORS.success },
  { name: "In Progress", value: 45, color: COLORS.warning },
  { name: "Pending", value: 20, color: COLORS.danger },
];

const taskProgress = delegatedTasks.map((task) => ({
  name: task.task,
  progress: task.progress,
}));

const SubstitutePage = () => {
  return (
    <div style={{ padding: 24, background: COLORS.lightBg }}>
      <h1 style={{ color: COLORS.dark, marginBottom: 24, fontWeight: 600 }}>
        Substitute Dashboard
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          {
            icon: <Users color={COLORS.primary} size={20} />,
            title: "Delegated Tasks",
            value: 5,
            color: COLORS.primary,
          },
          {
            icon: <CheckCircle color={COLORS.success} size={20} />,
            title: "Completed",
            value: 2,
            color: COLORS.success,
          },
          {
            icon: <Clock color={COLORS.warning} size={20} />,
            title: "In Progress",
            value: 2,
            color: COLORS.warning,
          },
          {
            icon: <AlertTriangle color={COLORS.danger} size={20} />,
            title: "Urgent",
            value: 1,
            color: COLORS.danger,
          },
        ].map((item, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card
              bordered={false}
              style={{
                background: "white",
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <Statistic
                title={
                  <span style={{ color: COLORS.dark, fontSize: 14 }}>
                    {item.title}
                  </span>
                }
                value={item.value}
                prefix={item.icon}
                valueStyle={{
                  color: item.color,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <PieChartIcon size={18} style={{ marginRight: 8 }} />
                <span>Task Distribution</span>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
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
        <Col xs={24} md={12}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Activity size={18} style={{ marginRight: 8 }} />
                <span>Task Progress</span>
              </div>
            }
            bordered={false}
            style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="20%"
                  outerRadius="80%"
                  data={taskProgress}
                  startAngle={180}
                  endAngle={-180}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                  />
                  <RadialBar
                    dataKey="progress"
                    cornerRadius={10}
                    fill={COLORS.primary}
                    label={{ position: "insideStart", fill: "#fff" }}
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="Delegated Tasks"
        bordered={false}
        style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
        extra={<ChevronRight color={COLORS.primary} />}
      >
        <Table
          columns={[
            {
              title: "Task",
              dataIndex: "task",
              key: "task",
              render: (text) => <strong>{text}</strong>,
            },
            {
              title: "Original Assignee",
              dataIndex: "original",
              key: "original",
              render: (text) => (
                <span style={{ color: COLORS.info }}>{text}</span>
              ),
            },
            {
              title: "Deadline",
              dataIndex: "deadline",
              key: "deadline",
              render: (date) => (
                <span style={{ color: COLORS.dark }}>{date}</span>
              ),
            },
            {
              title: "Priority",
              dataIndex: "priority",
              key: "priority",
              render: (priority) => (
                <Tag
                  color={
                    priority === "High"
                      ? COLORS.danger
                      : priority === "Medium"
                      ? COLORS.warning
                      : COLORS.success
                  }
                  style={{ fontWeight: 500 }}
                >
                  {priority}
                </Tag>
              ),
            },
            {
              title: "Progress",
              dataIndex: "progress",
              key: "progress",
              render: (progress) => (
                <Progress
                  percent={progress}
                  size="small"
                  strokeColor={
                    progress > 70
                      ? COLORS.success
                      : progress > 40
                      ? COLORS.warning
                      : COLORS.danger
                  }
                />
              ),
            },
          ]}
          dataSource={delegatedTasks}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default SubstitutePage;
