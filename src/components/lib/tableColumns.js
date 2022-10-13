export const getPokemonColumns = () => ([
  { header: " ",
  thClassName: "!border-b-0 !p-0 text-center h-[15px]",
    columns: [
    {
      accessorKey: "image",
      header: "",
      cell: (info) => info.getValue(),
      thClassName: "w-[80px]",
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
      thClassName: "pr-16",
    },
    {
      accessorKey: "abilitiesComponent",
      header: "Abilities",
      thClassName: "w-[80px] pr-6",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "typeComponent",
      header: "Type",
      cell: (info) => info.getValue(),
      enableSorting: false,
      thClassName: "pl-3 pr-14   w-[80px]"
    },
    {
      accessorKey: "types",
      header: "Types",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }]},
    {
      header: "Stats",
      thClassName: "text-center h-[15px] translate-y-3 !p-0 align-bottom !border-b-0" ,
      columns: [
        {
          accessorKey: "height",
          header: "Ht",
          thClassName: "w-[37.4px] px-1",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "hp",
          thClassName: "w-[37.4px] px-1",
          header: "Hp",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "attack",
          header: "Atk",
          thClassName: "w-[37.4px] px-1",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "special-attack",
          header: "S.Atk",
          thClassName: "w-[37.4px] px",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "defense",
          header: "Def",
          thClassName: "w-[37.4px] px-1",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "special-defense",
          header: "S.Def",
          thClassName: "w-[37.4px] px",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "speed",
          header: "Spd",
          thClassName: "w-[37.4px] px-1",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
      ],
    },
  ])