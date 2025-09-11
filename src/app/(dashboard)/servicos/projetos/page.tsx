// src/app/(dashboard)/servicos/projetos/page.tsx
"use client"; // Necessário para usar hooks como useState

import * as React from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

// Dados Falsos (Mock Data) para preencher a tabela, como solicitado
const mockProjects = [
  {
    id: "PROJ-001",
    name: "Desenvolvimento Nova Coleção 2026",
    assignees: [{ name: "Vitor Dente", avatar: "https://github.com/vitorgsd.png" }],
    deadline: "30/10/2025",
    status: "Em Andamento",
    progress: 75,
    parentId: null,
  },
  {
    id: "PROJ-002",
    name: "Aprovação de Amostras - Revestir 2026",
    assignees: [{ name: "Vitor Dente", avatar: "https://github.com/vitorgsd.png" }],
    deadline: "15/11/2025",
    status: "Em Andamento",
    progress: 40,
    parentId: "PROJ-001", // Este é um sub-projeto
  },
  {
    id: "PROJ-003",
    name: "Criação de Imagens para Catálogo",
    assignees: [{ name: "Designer A" }, { name: "Designer B" }],
    deadline: "20/12/2025",
    status: "Pendente",
    progress: 0,
    parentId: "PROJ-001", // Este é outro sub-projeto
  },
  {
    id: "PROJ-004",
    name: "Setup de Máquina - Cliente XYZ",
    assignees: [{ name: "Técnico 1" }],
    deadline: "25/09/2025",
    status: "Concluído",
    progress: 100,
    parentId: null,
  },
  {
    id: "PROJ-005",
    name: "Análise de Concorrência - Efeitos Digitais",
    assignees: [{ name: "Vitor Dente", avatar: "https://github.com/vitorgsd.png" }],
    deadline: "10/10/2025",
    status: "Com Impedimento",
    progress: 20,
    parentId: null,
  },
];

// Função para definir a cor do Badge com base no status
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Em Andamento":
      return "default"; // Azul padrão
    case "Concluído":
      return "success"; // Verde (adicione esta variante no seu Badge se não existir)
    case "Pendente":
      return "secondary"; // Cinza
    case "Com Impedimento":
      return "destructive"; // Vermelho
    default:
      return "outline";
  }
};

export default function ProjetosProducaoPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Projetos e Produção (Design)
        </h2>
        <div className="flex items-center gap-2">
          {/* Adicione componentes de filtro aqui se desejar */}
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Projeto
          </Button>
        </div>
      </div>

      {/* Tabela de Projetos */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[350px]">Nome do Projeto</TableHead>
              <TableHead>Responsáveis</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[64px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className={`font-medium ${project.parentId ? 'pl-10' : ''}`}>
                  {project.parentId && <span className="mr-2">↳</span>}
                  {project.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center -space-x-2">
                    {project.assignees.map((assignee) => (
                      <Avatar key={assignee.name} className="h-6 w-6 border-2 border-white">
                        <AvatarImage src={assignee.avatar} />
                        <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{project.deadline}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="w-[100px]" />
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar Projeto</DropdownMenuItem>
                      <DropdownMenuItem>Excluir Projeto</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Modal (Dialog) para Adicionar Novo Projeto */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Projeto</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar um novo projeto.
            </DialogDescription>
          </DialogHeader>
          {/* O formulário (react-hook-form) entrará aqui */}
          <div className="py-4">
             <p>Formulário de cadastro aqui...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}