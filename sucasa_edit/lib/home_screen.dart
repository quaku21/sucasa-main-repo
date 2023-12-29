// Inside the SecondScreen class
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sucasa_edit/main.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3, // Number of tabs
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Second Screen'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Tab 1'),
              Tab(text: 'Tab 2'),
              Tab(text: 'Tab 3'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            SecondScreenContent(),
            SecondScreenContent(),
            SecondScreenContent(),
          ],
        ),
      ),
    );
  }
}

class SecondScreenContent extends StatelessWidget {
  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);

    // Set initial text when the screen is opened
    _textEditingController.text = appState.editableText;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          GestureDetector(
            onTap: () {
              // Toggle between editable and non-editable states
              appState.setEditableText(
                appState.editableText.isEmpty ? 'Hey name is bla bla bla' : '',
              );
            },
            child: Container(
              width: double.infinity,
              height: 200,
              color: Colors.blue,
              child: appState.editableText.isEmpty
                  ? Center(
                      child: Text(
                        appState.editableText,
                        style: const TextStyle(fontSize: 20),
                      ),
                    )
                  : TextField(
                      controller: _textEditingController,
                      maxLines: null,
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                      ),
                    ),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              // Toggle between "Edit" and "Save" based on text editing state
              if (appState.editableText.isEmpty) {
                // Enter edit mode
                appState.setEditableText(_textEditingController.text);
              } else {
                // Save the changes
                appState.setEditableText('');
              }
            },
            child: Text(appState.editableText.isEmpty ? 'Edit' : 'Save'),
          ),
        ],
      ),
    );
  }
}
