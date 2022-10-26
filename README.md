# Estrutura de pastas

## apis

Coleções de chamadas a apis REST dividida por entidade.

### Estrutura

Ao criar uma nova coleção, utilize o sistema de classe e use os tipos disponibilizados em _@/apis/api.types_.

### APIs hooks

## components

## constants

### queries

## pages

### Page hooks

Os **page hooks** - como `useTodosList` ou `useTodosForm` - foram criados para desacoplar a lógica dos layouts, o que facilita a criação de testes. No entanto, funcionalidades que modificam ou utilizam elementos da DOM, não devem ser isoladas do layout. Por exemplo, o método `execute` da classe `Request`, dispara uma mensagem de erro para o usuário através de um `toast`. Por isso, ela deve ser utilizada dentro arquivo `.tsx`. O mesmo se aplica a `useParams` do _react-router-dom_ e outras.
