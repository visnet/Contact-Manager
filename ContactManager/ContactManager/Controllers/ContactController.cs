using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


    using ContactManager.Models;
    using ContactManager.Models;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Xml;

    namespace ContactManager
    {
        [Route("api/[controller]")]
        [ApiController]
        public class ContactController : ControllerBase
        {
            private readonly string _filePath = "Contact.json";

            // GET: api/contact
            [HttpGet]
            public IActionResult GetContacts()
            {
                var contacts = ReadContactsFromFile();
                return Ok(contacts);
            }

            // GET: api/contact/5
            [HttpGet("{id}")]
            public IActionResult GetContact(int id)
            {
                var contacts = ReadContactsFromFile();
                var contact = contacts.FirstOrDefault(c => c.Id == id);
                if (contact == null)
                {
                return NotFound(new { message = "Contact not found." });
            }
                return Ok(contact);
            }

            // POST: api/contact
            [HttpPost]
            public IActionResult CreateContact([FromBody] Contact contact)
            {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

                 var contacts = ReadContactsFromFile();
                contact.Id = contacts.Any() ? contacts.Max(c => c.Id) + 1 : 1;
                contacts.Add(contact);
                WriteContactsToFile(contacts);
                return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
            }

            // PUT: api/contact/5
            [HttpPut("{id}")]
            public IActionResult UpdateContact(int id, [FromBody] Contact updatedContact)
            {
                var contacts = ReadContactsFromFile();
                var contact = contacts.FirstOrDefault(c => c.Id == id);
                if (contact == null)
                {
                return NotFound(new { message = "Contact not found." });
            }
                contact.FirstName = updatedContact.FirstName;
                contact.LastName = updatedContact.LastName;
                contact.Email = updatedContact.Email;
                WriteContactsToFile(contacts);
                return NoContent();
            }

            // DELETE: api/contact/5
            [HttpDelete("{id}")]
            public IActionResult DeleteContact(int id)
            {
                var contacts = ReadContactsFromFile();
                var contact = contacts.FirstOrDefault(c => c.Id == id);
                if (contact == null)
                {
                return NotFound(new { message = "Contact not found." });
            }
                contacts.Remove(contact);
                WriteContactsToFile(contacts);
                return NoContent();
            }

            private List<Contact> ReadContactsFromFile()
            {
                if (!System.IO.File.Exists(_filePath))
                {
                    return new List<Contact>();
                }
                var json = System.IO.File.ReadAllText(_filePath);
                return JsonConvert.DeserializeObject<List<Contact>>(json);
            }

            private void WriteContactsToFile(List<Contact> contacts)
            {
                var json = JsonConvert.SerializeObject(contacts, Newtonsoft.Json.Formatting.Indented);
                System.IO.File.WriteAllText(_filePath, json);
            }
        }
    }


