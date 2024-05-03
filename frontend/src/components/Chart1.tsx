"use client"

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { api } from '@/services/apiClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Número de propostas por mês',
    },
  },
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function Chart1() { 
  const [proposalsData, setProposalsData] = useState({
    labels,
    datasets: [
      {
        label: 'Propostas',
        data: new Array(labels.length).fill(0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })
  
  useEffect(() => {
    async function fetchProposals() {
      try {
        const response = await api.get('/proposals');
        const proposals = response.data;

        const proposalsByMonth = new Array(labels.length).fill(0);

        proposals.forEach(proposal => {
          const createdAt = new Date(proposal.createdAt);
          const month = createdAt.getMonth();
          proposalsByMonth[month]++;
        });

        const updatedData = {
          labels,
          datasets: [
            {
              label: 'Propostas',
              data: proposalsByMonth,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        };

        setProposalsData(updatedData);
      } catch (error) {
        console.error('Erro ao buscar as propostas:', error);
      }
    }

    fetchProposals();
  }, []);
  
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <Bar options={options} data={proposalsData} />
      </div>
    </div>
  );
}