-- Powered by projectlocal-vim
-- https://github.com/creativenull/projectlocal-vim
local ok, dls = pcall(require, 'diagnosticls-configs')
if ok then
  local pl = require('projectlocal.lsp')
  require('lspconfig').tsserver.setup(pl.get_config())
  require('lspconfig').volar.setup(pl.get_config())
  -- require('lspconfig').tailwindcss.setup(pl.get_config())

  dls.setup({
    vue = {
      formatter = require('diagnosticls-configs.formatters.prettier'),
    },
    javascript = {
      linter = require('diagnosticls-configs.linters.eslint'),
      formatter = require('diagnosticls-configs.formatters.prettier'),
    },
    typescript = {
      linter = require('diagnosticls-configs.linters.eslint'),
      formatter = require('diagnosticls-configs.formatters.prettier'),
    },
  })
end
