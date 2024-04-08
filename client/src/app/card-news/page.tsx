'use client';
import Container from '@/app/_components/container';
import { Intro } from '@/app/_components/intro';
import CardList from "@/app/_components/card-list";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Flex, Space } from 'antd';

export default function Index() {
  const { Meta } = Card;

  return (
    <main>
      <Container>
        <Intro />
        <Space className='justify-between mb-3'>
            <h1 style={{ fontSize: 20, fontWeight: 'bolder' }}>카드뉴스</h1>
          </Space>
        <CardList />
      </Container>
    </main>
  );
}
