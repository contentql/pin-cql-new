type Client = {
  id: number
  res: any
}

const clients: Client[] = []

export function addClient(id: number, res: any): void {
  clients.push({ id, res })
}

export function removeClient(id: number): void {
  const index = clients.findIndex(client => client.id === id)
  if (index !== -1) {
    clients.splice(index, 1)
  }
}

export function sendMessageToClient(id: number, message: string): void {
  const client = clients.find(client => client.id === id)
  if (client) {
    client.res.write(`data: ${message}\n\n`)
  }
}

export function getClientsCount(): number {
  return clients.length
}
