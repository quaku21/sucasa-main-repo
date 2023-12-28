import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sucasa_edit/main.dart';

class SecondScreen extends StatelessWidget {
  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);

    _textEditingController.text = appState.editableText;

    return Scaffold(
      appBar: AppBar(
        title: Text('Second Screen'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GestureDetector(
              onTap: () {
                appState.setEditableText(
                  appState.editableText.isEmpty
                      ? 'Hey name is bla bla bla'
                      : '',
                );
              },
              child: Container(
                width: double.infinity,
                height: 400,
                child: appState.editableText.isEmpty
                    ? Center(
                        child: Text(
                          appState.editableText,
                          style: TextStyle(fontSize: 20),
                        ),
                      )
                    : TextField(
                        controller: _textEditingController,
                        maxLines: null,
                        decoration: InputDecoration(
                            hintText: 'Enter your text here',
                            border: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: Colors.grey,
                                width: 2,
                              ),
                              borderRadius: BorderRadius.circular(8),
                            ))),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                if (appState.editableText.isEmpty) {
                  appState.setEditableText(_textEditingController.text);
                } else {
                  appState.setEditableText(_textEditingController.text);
                }
              },
              style: ElevatedButton.styleFrom(
                foregroundColor: Colors.white,
                backgroundColor: const Color(0xff103128),
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: Text(appState.editableText.isEmpty ? 'Edit' : 'Save'),
            ),
          ],
        ),
      ),
    );
  }
}
