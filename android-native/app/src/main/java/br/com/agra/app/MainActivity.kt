package br.com.agra.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

private data class FieldHealth(val name: String, val crop: String, val score: Int)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AgraApp() }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AgraApp() {
    var pendingOperations by remember { mutableStateOf(0) }
    val fields = remember {
        listOf(
            FieldHealth("Talhao Norte", "Milho", 88),
            FieldHealth("Talhao Ribeirao", "Feijao", 74),
            FieldHealth("Talhao Baixada", "Mandioca", 42)
        )
    }

    MaterialTheme {
        Scaffold(topBar = { TopAppBar(title = { Text("AGRA") }) }) { padding ->
            LazyColumn(
                modifier = Modifier.fillMaxSize().padding(padding).padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                item {
                    Text("Gestao rural no campo", style = MaterialTheme.typography.headlineSmall)
                    Text("Delmiro Gouveia · Sertao de Alagoas")
                    Spacer(Modifier.height(8.dp))
                    Text(
                        if (pendingOperations == 0) "Tudo salvo neste dispositivo" else "$pendingOperations operacao(oes) pendente(s)",
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                item { SummaryCard() }
                item {
                    Button(
                        onClick = { pendingOperations++ },
                        modifier = Modifier.fillMaxWidth()
                    ) { Text("Registrar atividade offline") }
                }
                item { Text("Saude dos talhoes", style = MaterialTheme.typography.titleLarge) }
                items(fields) { field -> FieldCard(field) }
            }
        }
    }
}

@Composable
private fun SummaryCard() {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(18.dp)) {
            Text("Proxima orientacao", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(6.dp))
            Text("Verifique a umidade do Talhao Baixada antes de decidir a irrigacao.")
            Spacer(Modifier.height(8.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Fonte: trilha tecnica")
                Text("Confianca: revisar")
            }
        }
    }
}

@Composable
private fun FieldCard(field: FieldHealth) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Row(modifier = Modifier.fillMaxWidth().padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween) {
            Column {
                Text(field.name, style = MaterialTheme.typography.titleMedium)
                Text(field.crop)
            }
            Text("${field.score}/100", style = MaterialTheme.typography.titleLarge)
        }
    }
}
