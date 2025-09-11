// src/app/(dashboard)/servicos/projetos/page.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronRight,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema de validação
const projetoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  prazo: z.string().min(1, "Prazo é obrigatório"),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  projetoPai: z.string().optional(),
});

type ProjetoFormData = z.infer<typeof projetoSchema>;

// Tipos
interface Responsavel {
  id: string;
  nome: string;
  avatar?: string;
  iniciais: string;
}

interface Projeto {
  id: string;
  nome: string;
  responsaveis: Responsavel[];
  prazo: Date;
  status: "Em Andamento" | "Pendente" | "Concluído" | "Com Impedimento";
  progresso: number;
  projetoPai?: string;
  nivel: number;
}

// Mock Data
const responsaveisMock: Responsavel[] = [
  { id: "1", nome: "Ana Silva", iniciais: "AS" },
  { id: "2", nome: "João Santos", iniciais: "JS" },
  { id: "3", nome: "Maria Costa", iniciais: "MC" },
  { id: "4", nome: "Pedro Lima", iniciais: "PL" },
  { id: "5", nome: "Carla Oliveira", iniciais: "CO" },
];

const projetosMock: Projeto[] = [
  {
    id: "1",
    nome: "Desenvolvimento de Nova Linha Cerâmica Premium",
    responsaveis: [responsaveisMock[0], responsaveisMock[1]],
    prazo: new Date("2024-12-15"),
    status: "Em Andamento",
    progresso: 65,
    nivel: 0,
  },
  {
    id: "2",
    nome: "Pesquisa de Materiais",
    responsaveis: [responsaveisMock[2]],
    prazo: new Date("2024-11-30"),
    status: "Concluído",
    progresso: 100,
    projetoPai: "1",
    nivel: 1,
  },
  {
    id: "3",
    nome: "Desenvolvimento de Protótipos",
    responsaveis: [responsaveisMock[1], responsaveisMock[3]],
    prazo: new Date("2024-12-10"),
    status: "Em Andamento",
    progresso: 45,
    projetoPai: "1",
    nivel: 1,
  },
  {
    id: "4",
    nome: "Campanha de Marketing Digital",
    responsaveis: [responsaveisMock[4]],
    prazo: new Date("2024-11-25"),
    status: "Pendente",
    progresso: 15,
    nivel: 0,
  },
  {
    id: "5",
    nome: "Otimização de Processos de Produção",
    responsaveis: [responsaveisMock[0], responsaveisMock[3]],
    prazo: new Date("2024-10-30"),
    status: "Com Impedimento",
    progresso: 30,
    nivel: 0,
  },
  {
    id: "6",
    nome: "Análise de Qualidade",
    responsaveis: [responsaveisMock[2]],
    prazo: new Date("2024-11-15"),
    status: "Em Andamento",
    progresso: 80,
    nivel: 0,
  },
];

export default function ProjetosProducaoPage() {
  const [projetos, setProjetos] = useState<Projeto[]>(projetosMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ProjetoFormData>({
    resolver: zodResolver(projetoSchema),
    defaultValues: {
      nome: "",
      prazo: "",
      responsavel: "",
      projetoPai: "",
    },
  });

  // Função para obter cor do status
  const getStatusColor = (status: Projeto["status"]) => {
    switch (status) {
      case "Em Andamento":
        return "default";
      case "Pendente":
        return "secondary";
      case "Concluído":
        return "outline";
      case "Com Impedimento":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Filtrar projetos
  const projetosFiltrados = projetos.filter((projeto) => {
    const matchesSearch = projeto.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || projeto.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Função para adicionar projeto
  const onSubmit = (data: ProjetoFormData) => {
    const responsavel = responsaveisMock.find((r) => r.id === data.responsavel);
    if (!responsavel) return;

    const novoProjeto: Projeto = {
      id: Date.now().toString(),
      nome: data.nome,
      responsaveis: [responsavel],
      prazo: new Date(data.prazo),
      status: "Pendente",
      progresso: 0,
      projetoPai: data.projetoPai || undefined,
      nivel: data.projetoPai ? 1 : 0,
    };

    setProjetos([...projetos, novoProjeto]);
    form.reset();
    setIsDialogOpen(false);
  };

  // Função para excluir projeto
  const excluirProjeto = (id: string) => {
    setProjetos(projetos.filter((p) => p.id !== id));
  };

  // Obter projetos principais para o select
  const projetosPrincipais = projetos.filter((p) => p.nivel === 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section - IGUAL AO DASHBOARD */}
      <div className="mb-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Projetos e Produção (Design)
        </h2>
        <p className="text-gray-600">
          Gerencie e acompanhe o progresso de todos os projetos de design cerâmico e produção
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Projeto</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Projeto</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome do projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prazo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um responsável" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {responsaveisMock.map((responsavel) => (
                            <SelectItem key={responsavel.id} value={responsavel.id}>
                              {responsavel.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projetoPai"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projeto Pai (Opcional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um projeto pai" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Nenhum (Projeto Principal)</SelectItem>
                          {projetosPrincipais.map((projeto) => (
                            <SelectItem key={projeto.id} value={projeto.id}>
                              {projeto.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Criar Projeto</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Status: {statusFilter === "todos" ? "Todos" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("todos")}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Em Andamento")}>
              Em Andamento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pendente")}>
              Pendente
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Concluído")}>
              Concluído
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Com Impedimento")}>
              Com Impedimento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Projeto</TableHead>
              <TableHead>Responsáveis</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead className="w-[50px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projetosFiltrados.map((projeto) => (
              <TableRow key={projeto.id}>
                <TableCell>
                  <div
                    className="flex items-center gap-2"
                    style={{ paddingLeft: `${projeto.nivel * 24}px` }}
                  >
                    {projeto.nivel > 0 && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="font-medium">{projeto.nome}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {projeto.responsaveis.map((responsavel) => (
                      <Avatar key={responsavel.id} className="w-8 h-8 border-2 border-white">
                        <AvatarImage src={responsavel.avatar} />
                        <AvatarFallback className="text-xs">
                          {responsavel.iniciais}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {format(projeto.prazo, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(projeto.status)}>
                    {projeto.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={projeto.progresso} className="w-20" />
                    <span className="text-sm text-gray-600 min-w-[35px]">
                      {projeto.progresso}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Projeto
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => excluirProjeto(projeto.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Projeto
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}